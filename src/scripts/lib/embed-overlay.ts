/*!
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {IStyle} from '../interfaces/style';
import {highlightBlock, registerLanguage} from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/docco.css';

registerLanguage('javascript', javascript);
registerLanguage('xml', xml);

/**
 * The embed overlay
 */
export default class {
  private $embedButton: HTMLButtonElement;
  private $background: HTMLDivElement;
  private $overlay: HTMLElement;
  private $close: HTMLButtonElement;
  private $copy: HTMLButtonElement;
  private $apiKey: HTMLInputElement;
  private $snippet: HTMLElement;
  private $snippetCopyArea: HTMLTextAreaElement;
  private isInitialized: boolean = false;
  private fileId?: string;
  private style?: IStyle;

  constructor(map: google.maps.Map, onClick: () => void) {
    this.$embedButton = document.querySelector('#embed') as HTMLButtonElement;
    this.$background = document.querySelector(
      '.embed-overlay__background'
    ) as HTMLDivElement;
    this.$close = document.querySelector(
      '.embed-overlay__content__close'
    ) as HTMLButtonElement;
    this.$overlay = document.querySelector('#embed-overlay') as HTMLElement;
    this.$apiKey = document.querySelector('#embed-api-key') as HTMLInputElement;
    this.$copy = document.querySelector('#copy-button') as HTMLButtonElement;
    this.$snippet = document.querySelector(
      '#embed-snippet'
    ) as HTMLTextAreaElement;
    this.$snippetCopyArea = document.querySelector(
      '#embed-snippet-copy-area'
    ) as HTMLTextAreaElement;

    this.$embedButton.addEventListener('click', () => {
      this.$embedButton.setAttribute('disabled', 'disabled');
      onClick();
      ga('send', 'event', 'Visualizer', 'Embed Button Click');
    });

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.$embedButton);

    this.updateSnippet = this.updateSnippet.bind(this);
    this.copySnippet = this.copySnippet.bind(this);
    this.close = this.close.bind(this);
  }

  /**
   * Open the embed overlay
   */
  public open(fileId: string, style?: IStyle): void {
    if (!this.$overlay || !this.$snippet || !this.$apiKey) {
      return;
    }

    if (!this.isInitialized) {
      this.initialize();
    }

    this.fileId = fileId;
    this.style = style;

    this.$overlay.classList.remove('embed-overlay--hidden');
    this.updateSnippet();
  }

  /**
   * Update the snippet to copy
   */
  private updateSnippet() {
    if (!this.fileId) {
      return;
    }

    const apiKey = this.$apiKey.value || 'YOUR_API_KEY';
    const snippet = generateSnippet({
      apiKey,
      fileId: this.fileId,
      style: this.style
    });
    this.$snippet.innerText = snippet;
    this.$snippetCopyArea.value = snippet;
    highlightBlock(this.$snippet);
  }

  /**
   * Initialize the listener
   */
  private initialize() {
    this.$apiKey.addEventListener('input', this.updateSnippet);
    this.$background.addEventListener('click', this.close);
    this.$close.addEventListener('click', this.close);
    this.$copy.addEventListener('click', this.copySnippet);
    this.isInitialized = true;
  }

  /**
   * Close the overlay
   */
  private close() {
    this.$embedButton.removeAttribute('disabled');
    this.$overlay.classList.add('embed-overlay--hidden');
  }

  /**
   * Copies the snippet to the users clipboard.
   */
  private copySnippet(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.$snippetCopyArea.focus();
    this.$snippetCopyArea.select();

    document.execCommand('copy');
  }
}

/**
 * Generate the snippet code
 */
interface IGenerateSnippetParams {
  apiKey: string;
  fileId: string;
  style?: IStyle;
}
function generateSnippet(params: IGenerateSnippetParams): string {
  const quoteRegex = /"/g;
  const keyRegex = /'(\w+)':/gi;
  const {origin, pathname} = document.location;
  const style =
    params.style &&
    JSON.stringify(params.style)
      .replace(quoteRegex, "'") // tslint:disable-line quotemark
      .replace(keyRegex, '$1:');

  return `<div id="fusiontable-map"></div>
<script src="${origin}${pathname}/embed.js"></script>
<style>
  #fusiontable-map {width: 100%; height: 100%}
  body.cursor-pointer .gm-style > div {cursor: pointer !important;}
</style>
<script>
  var containerSelector = '#fusiontable-map';
  var apiKey = '${params.apiKey}';
  var fileId = '${params.fileId}';
  ${style ? `var style = ${style};\n` : ''}
  ${
    style
      ? 'fusiontablesArchiveEmbed(containerSelector, apiKey, fileId, style);'
      : 'fusiontablesArchiveEmbed(containerSelector, apiKey, fileId);'
  }
</script>`;
}

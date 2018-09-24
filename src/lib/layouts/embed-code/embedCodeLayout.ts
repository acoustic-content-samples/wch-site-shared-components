/*******************************************************************************
 * Copyright IBM Corp. 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
import {
    LayoutComponent
} from '@ibm-wch-sdk/ng';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { TypeEmbedCodeComponent } from '../../components/embed-code/typeEmbedCodeComponent';

/*
 * @name embedCodeLayout
 * @id embed-code-layout
 */
@LayoutComponent({
    selector: 'embed-code-layout'
})
@Component({
    selector: 'app-embed-code-layout-component',
    templateUrl: './embedCodeLayout.html',
    styleUrls: ['./embedCodeLayout.scss'],
    preserveWhitespaces: false
})
export class EmbedCodeLayoutComponent extends TypeEmbedCodeComponent implements AfterViewInit {

  @ViewChild('snippet') snippetElem: ElementRef;
  iframeHeight: string;
  iframeWidth: string;

  constructor() {
    super();
    /*
* TODO initialize your custom fields here, note that
* you can refer to the values bound via @RenderingContextBinding from
* your super class.
*
* Make sure to call 'this.safeSubscribe' if you plan to subscribe to observables
*/
    this.safeSubscribe(this.onHeight, () => {
      this.resizeIFrame();
    });
    this.safeSubscribe(this.onWidth, () => {
      this.resizeIFrame();
    });
    this.safeSubscribe(this.onHtml, () => {
      this.resizeIFrame();
    });
    this.safeSubscribe(this.onJs, () => {
      this.resizeIFrame();
    });
    this.safeSubscribe(this.onCss, () => {
      this.resizeIFrame();
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.snippetElem) {
      this.snippetElem.nativeElement.onload = () => {
        this.resizeIFrame();
      };
    }
  }

  resizeIFrame() {
    if (this.height) {
      this.iframeHeight = this.height;
    } else {
      if (this.snippetElem) {
        this.iframeHeight = this.snippetElem.nativeElement.contentDocument.documentElement.scrollHeight + 'px';
      } else {
        this.iframeHeight = '100%';
      }
    }
    if (this.width) {
      this.iframeWidth = this.width;
    } else {
      this.iframeWidth = '100%';
    }
  }

}

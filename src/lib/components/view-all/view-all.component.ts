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
import { Component, Input, OnInit } from '@angular/core';
import {AbstractRenderingComponent, Link, RenderingContextBinding} from "@ibm-wch-sdk/ng";
import {
	Observable
} from 'rxjs';

@Component({
	selector: 'app-view-all',
	templateUrl: './view-all.component.html',
	styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent extends AbstractRenderingComponent implements OnInit {

	@RenderingContextBinding('link.viewAllLink')
	readonly onViewAllLink: Observable<Link>;

	/**
	 * @see #onViewAllLink
	 */
	@RenderingContextBinding()
	readonly viewAllLink: Link;

	constructor() {
		super();
	}

	ngOnInit() {
		super.ngOnInit();

	}

	isButtonLinkSet(): boolean {
		return (this.viewAllLink && this.viewAllLink.linkURL && this.viewAllLink.linkURL.length > 0) ? true : false;
	}
}

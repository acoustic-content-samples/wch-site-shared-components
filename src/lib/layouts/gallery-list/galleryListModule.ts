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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgComponentsModule } from '@ibm-wch-sdk/ng';
import { WchNgEditComponentsModule } from '@ibm-wch-sdk/ng-edit';
import { SiteCommonModule } from '@ibm-wch/components-ng-shared-utilities';
import { GenericLayoutModule } from "../../components/generic/generic.layout.module";
import { ViewAllModule } from "../../components/view-all/view-all.module";

import { GalleryListLayoutComponent } from './galleryListLayout';

@NgModule({
    /**
    * TODO explicitly add those modules that are used by the layout
    */
    imports: [
        CommonModule,
        WchNgComponentsModule,
        WchNgEditComponentsModule,
        GenericLayoutModule,
        SiteCommonModule,
        ViewAllModule
    ],
    declarations: [GalleryListLayoutComponent],
    exports: [GalleryListLayoutComponent],
    entryComponents: [GalleryListLayoutComponent]
})
export class GalleryListModule {
}
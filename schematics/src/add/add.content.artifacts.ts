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
import {apply, mergeWith, move, Rule, template, url} from "@angular-devkit/schematics";
import {classify, dasherize} from "@angular-devkit/core/src/utils/strings";
import {Schema} from "./schema";

const stringUtils = {dasherize, classify};

// Add shared components' layouts, layout-mappings, types, thumbnails to SPA project
export function addWCHontentArtifaces(options: Schema): Rule {
    const wchSource = apply(url('../content-artifacts'), [
        template({
            ...stringUtils,
            ...options
        }),
        move('src/wchLayouts/')
    ]);

    return mergeWith(wchSource);
}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { MatCardModule } from "@angular/material/card";
import { MatTreeModule } from "@angular/material/tree";
import {FileExplorerApiService} from "./services/file-explorer-api.service";
import { HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FileExplorerService} from "./services/file-explorer.service";
import {MatTableModule} from "@angular/material/table";
import {SizePipe} from "./pipes/size.pipe";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    FileTreeComponent,
    FileExplorerComponent,
    SizePipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    FileExplorerApiService,
    FileExplorerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { MyTopComponent } from './my-top.component';
import { MoodMessageComponent } from './mood-message/mood-message.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MyTopComponent,
    MoodMessageComponent
  ],
  exports: [
    MyTopComponent
  ],
  providers: [ ]
})
export class MyTopModule { }

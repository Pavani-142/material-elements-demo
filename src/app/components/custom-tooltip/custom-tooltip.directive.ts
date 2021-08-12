import { Directive, HostListener, Input, TemplateRef, ViewChild } from "@angular/core";
import {
  VERSION,
  MatTooltip,
  MatDialog,
  MatDialogConfig
} from "@angular/material";

@Directive({
  selector: "[myDir]",
  providers: [MatTooltip]
})
export class MyDirective {
  tooltip: MatTooltip;

  @Input("myDir") myDir: string;
  @ViewChild("dataReport", {static: true}) dataReport: TemplateRef<any>;

  constructor(tooltip: MatTooltip, public dialog: MatDialog) {
    this.tooltip = tooltip;
  }

  @HostListener("mouseover") mouseover() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '10%';
    // dialogConfig.height = '';

    //this.dialog.open(this.dataReport, dialogConfig);

    this.tooltip.message = "oh yeah..." + this.myDir;
    this.tooltip.show();
  }
}

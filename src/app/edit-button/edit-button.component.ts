import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'child-cell',
    template: `<span>
                <a title="Edit" class="btn btn-social-icon" (click)="invokeParentMethod()">
                <i class="fa fa-fw fa-pencil"></i> 
                </a>
               </span>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class EditButtonComponent implements ICellRendererAngularComp {
    
    constructor(){

    }
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
      console.log("ButtonCompo1 ",this.params.data);
      if(this.params.data instanceof Array){
          console.log("Array");
        this.params.context.componentParent.editmethodFromParent(`${this.params.data[0]}`)
      } else {
          console.log("Not Array");
           this.params.context.componentParent.editmethodFromParent(`${this.params.data.id}`)
      }
    }

    refresh(): boolean {
        return false;
    }
}

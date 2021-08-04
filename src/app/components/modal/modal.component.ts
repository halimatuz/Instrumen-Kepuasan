import {Component, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-content',
    template: `
    <div class="modal-header">
        <h5 class="modal-title text-center">Pilih User</h5>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body"> <div *ngFor="let item of name">
    <button type="button"  *ngIf="item[0]" class="btn btn-secondary btn-lg btn-block {{item[1]}}">{{item[0]}}</button>
    <h5 style="text-align:center">{{item[2]}}</h5>
    </div>

    </div>
    
    `
})
export class NgbdModalContent {
    @Input() name;
    constructor(public activeModal: NgbActiveModal) {
       

    }
}

@Component({
    selector: 'app-modal-component',
    templateUrl: './modal.component.html'
})
export class NgbdModalComponent {
    @Input() body;
    constructor(private modalService: NgbModal) {
        
    }
    open() {
        const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.name = this.body;
        console.log(this.body)
        
    }
}

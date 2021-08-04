import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Details } from './details.model';


@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private firestore: AngularFirestore) { }
  
  getPolicies() {
    return this.firestore.collection('details').snapshotChanges();
  }
  createPolicy(detail: Details){
    return this.firestore.collection('details').add(detail);
  }
  updatePolicy(detail: Details){
    delete detail.id;
    this.firestore.doc('details/' + detail.id).update(detail);
  }
  deletePolicy(id: string){
    this.firestore.doc('details/' + id).delete();
  }
}

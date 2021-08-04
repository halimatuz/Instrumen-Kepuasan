import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Fakultas } from './fakultas.model';

@Injectable({
  providedIn: 'root'
})
export class FakultasService {

  constructor(private firestore: AngularFirestore) { }
  
  getPolicies() {
    return this.firestore.collection('fakultas').snapshotChanges();
  }
  createPolicy(quest: Fakultas){
    return this.firestore.collection('fakultas').add(quest);
  }
  updatePolicy(quest: Fakultas){
    delete quest.id_fakultas;
    this.firestore.doc('fakultas/' + quest.id_fakultas).update(quest);
  }
  deletePolicy(id: string){
    this.firestore.doc('fakultas/' + id).delete();
  }
}

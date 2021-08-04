import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Prodi } from './prodi.model';

@Injectable({
  providedIn: 'root'
})
export class ProdiService {

  constructor(private firestore: AngularFirestore) { }
  
  getPolicies() {
    return this.firestore.collection('prodi').snapshotChanges();
  }
  createPolicy(quest: Prodi){
    return this.firestore.collection('prodi').add(quest);
  }
  updatePolicy(quest: Prodi){
    delete quest.id_prodi;
    this.firestore.doc('prodi/' + quest.id_prodi).update(quest);
  }
  deletePolicy(id: string){
    this.firestore.doc('prodi/' + id).delete();
  }
}

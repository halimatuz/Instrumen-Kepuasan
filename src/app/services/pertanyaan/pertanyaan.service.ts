import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pertanyaan } from './pertanyaan.model';

@Injectable({
  providedIn: 'root'
})
export class PertanyaanService {

  constructor(private firestore: AngularFirestore) { }
  
  getPolicies() {
    return this.firestore.collection('pertanyaan').snapshotChanges();
  }
  createPolicy(quest: Pertanyaan){
    return this.firestore.collection('pertanyaan').add(quest);
  }
  updatePolicy(quest: Pertanyaan){
    delete quest.id;
    this.firestore.doc('pertanyaan/' + quest.id).update(quest);
  }
  deletePolicy(id: string){
    this.firestore.doc('pertanyaan/' + id).delete();
  }


}

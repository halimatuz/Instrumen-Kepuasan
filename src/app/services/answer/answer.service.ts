
import { Injectable } from '@angular/core';
import { Answer } from './answer.model';  // Student data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  studentsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  studentRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase,
    private firestore: AngularFirestore) { }

  createPolicy(quest: Answer){
    return this.firestore.collection('answer').add(quest);
  }
  // Create Student
  AddStudent(ans: Answer, krt:string) {
    this.studentsRef = this.db.list('answer');
    this.studentsRef.push({
      nama: ans.nama,
      prodi: ans.prodi,
      fakultas: ans.fakultas,
      kriteria: krt
    })
  }

  // Fetch Single Student Object
  GetStudent(id: string) {
    this.studentRef = this.db.object('answer/' + id);
    return this.studentRef;
  }

  // Fetch Students List
  GetStudentsList() {
    this.studentsRef = this.db.list('answer');
    return this.studentsRef;
  }  

  // Update Student Object
  UpdateStudent(ans: Answer, krt:string) {
    this.studentRef.update({
      nama: ans.nama,
      prodi: ans.prodi,
      fakultas: ans.fakultas,
      kriteria: krt
    })
  }  

  // Delete Student Object
  DeleteStudent(id: string) { 
    this.studentRef = this.db.object('answer/'+id);
    this.studentRef.remove();
  }
}

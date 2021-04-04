
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SuscriptorItem } from '../../models/suscriptor-item/suscriptor-item-interface';

/*
  Generated class for the Db provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DbProvider {

  db: SQLiteObject = null;
  constructor(public sqlite: SQLite) {
    console.log('Hello Db Provider');
  }

  public openDb() {
    return this.sqlite.create({
      name: 'dataLectura.db',
      location: 'default' // el campo location es obligatorio
    })
      .then((db: SQLiteObject) => {
        this.db = db;
      })

  }

  ///#region suscriptor

public createTables(){
  
  
  this.createTableSuscriptor();
  this.createTableLecturas();

  return true;
}


  public createAllTables()
  {

    this.db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT UNIQUE, password TEXT)").then(() => {
    }, error => {
        console.log("CREATE TABLE ERROR", error);
    });
    this.db.executeSql("CREATE TABLE IF NOT EXISTS lecturas( lecturaid INTEGER PRIMARY KEY AUTOINCREMENT,suscriptorid INTEGER, codigo TEXT, fecha TEXT, lectura INTEGER, observacion TEXT, lat FLOAT, lng FLOAT)").then(()=>
    {}, error => {
        console.log("CREATE TABLE ERROR", error);
    });
    this.db.executeSql("create table if not exists suscriptores( suscriptorid INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, descripcion TEXT,direccion TEXT,estado TEXT, lat FLOAT, lng FLOAT, medidor TEXT )").then(() =>
    {}, error => 
    {
        console.log("CREATE TABLE ERROR", error);
    });

  }

  public createTableSuscriptor() {
    return this.db.executeSql("create table if not exists suscriptores( suscriptorid INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, descripcion TEXT,direccion TEXT,estado TEXT, lat FLOAT, lng FLOAT, medidor TEXT )", []);
  }
  public addSuscriptor(data: SuscriptorItem) {
    let sql = "INSERT INTO suscriptores ( codigo , descripcion ,direccion ,estado , lat , lng , medidor  ) values (?,?,?,?,?,?,?)";
    return this.db.executeSql(sql, [data.codigo, data.descripcion, data.direccion, data.estado, data.lat, data.lng, data.medidor]);
  }

  public updateSuscriptor(data: SuscriptorItem) {
    let sql = "UPDATE suscriptores SET codigo =?, descripcion=? ,direccion =?,estado=? , lat =?, lng =?, medidor =? where suscriptorid = ?;";
    return this.db.executeSql(sql, [data.codigo, data.descripcion, data.direccion, data.estado, data.lat, data.lng, data.medidor,data.suscriptorid]);
  }

  public deleteSuscriptor(data) {
    let sql = "DELETE FROM suscriptores where suscriptorid = ?";
    return this.db.executeSql(sql, [data.suscriptorid]);
  }
  
  public deleteSuscriptores() {
    let sql = "DELETE FROM suscriptores";
    return this.db.executeSql(sql);
  }
  public getsuscriptorbymedidor(data) {
    let sql = "SELECT * FROM suscriptores where medidor=?";
    return this.db.executeSql(sql, [data]);
  }

  public getSuscriptores() {
    let sql = "SELECT * FROM suscriptores where 1=1";
    return this.db.executeSql(sql, []);
  }
  public getSuscriptor(id) {
    let sql = "SELECT * FROM suscriptores where suscriptorid = ?";
    return this.db.executeSql(sql, [id]);
  }

  ///lecturas
/*
  lecturaid : number;
  suscriptorid: string;
  fecha : Date;
  lectura: number;
  observacion: string;
  latitud: string;
  longitud: string;
  */

  public createTableLecturas() {
    return this.db.executeSql("create table if not exists lecturas( lecturaid INTEGER PRIMARY KEY AUTOINCREMENT,suscriptorid INTEGER, codigo TEXT, fecha TEXT, lectura INTEGER, observacion TEXT, lat FLOAT, lng FLOAT )", []);
  }
  public addLectura(data) {
    let sql = "INSERT INTO lecturas ( suscriptorid ,codigo,fecha ,lectura ,observacion, lat , lng   ) values (?,?,?,?,?,?,?)";
    return this.db.executeSql(sql, [ data.suscriptorid,data.codigo ,data.fecha ,data.lectura ,data.observacion, data.lat , data.lng ]);
  }

  public updateLectura(data) {
    let sql = "UPDATE lecturas SET suscriptorid =? ,codigo =?,fecha = ? ,lectura =? ,observacion = ?, lat = ?, lng =?  where lecturaid = ?;";
    return this.db.executeSql(sql, [ data.suscriptorid,data.codigo ,data.fecha ,data.lectura ,data.observacion, data.lat , data.lng, data.lecturaid ]);
  }

  public deleteLectura(data) {
    let sql = "DELETE FROM lecturas where lecturaid = ?";
    return this.db.executeSql(sql, [data.lecturaid]);
  }

   
  public deleteLecturas() {
    let sql = "DELETE FROM lecturas";
    return this.db.executeSql(sql);
  }
  
  public getViewLecturas() {
    let sql = "SELECT l.lecturaid, l.suscriptorid ,l.codigo,s.descripcion,l.fecha ,l.lectura ,l.observacion, l.lat , l.lng FROM lecturas l, suscriptores s where lecturas.suscriptorid = suscriptores.suscriptorid";
    return this.db.executeSql(sql),[];
  }

  public getLecturas() {
    let sql = "SELECT lecturaid, suscriptorid, codigo,fecha ,lectura ,observacion, lat , lng FROM lecturas where 1=1";
    return this.db.executeSql(sql,[]);
  }


}
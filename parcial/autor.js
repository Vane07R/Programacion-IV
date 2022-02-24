Vue.component('autor', {
    data:()=>{
        return {
            autors: [],
            buscar: '',
            autor: {
                accion: 'nuevo',
                msg : '',
                idautor: '',
                codigo: '',
                nombre: '',
                pais:'',
                telefono:''
        
            }
        }
    },
    methods: {
        buscarautor(){
            this.obtenerDatos(this.buscar);
        },
        guardarautor(){
            this.obtenerDatos();
            let autors = this.autors || [];
            if( this.autor.accion == 'nuevo' ){
                this.autor.idautor = idUnicoFecha();
                autors.push(this.autor);
            }else if( this.autor.accion == 'modificar' ){
                let index = autors.findIndex(autor=>autor.idautor==this.autor.idautor);
                autors[index] = this.autor;
            }else if( this.autor.accion == 'eliminar' ){
                let index = autors.findIndex(autor=>autor.idautor==this.autor.idautor);
                autors.splice(index,1);
            }
            localStorage.setItem('autors', JSON.stringify(autors));
            this.autor.msg = 'autor procesado con exito';
            this.nuevoautor();
            this.obtenerDatos();
        },
        modificarautor(data){
            this.autor = JSON.parse(JSON.stringify(data));
            this.autor.accion = 'modificar';
        },
        eliminarautor(data){
            if( confirm(`¿Esta seguro de eliminar el autor ${data.nombre}?`) ){
                this.autor.idautor = data.idautor;
                this.autor.accion = 'eliminar';
                this.guardarautor();
            }
        },
        obtenerDatos(busqueda=''){
            this.autors = [];
            if( localStorage.getItem('autors')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('autors')).length; i++){
                    let data = JSON.parse(localStorage.getItem('autors')) [i];
                    if( this.buscar.length>0 ){
                        if( data.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ){
                            this.autor.push(data);
                        }
                    }else{
                        this.autors.push(data);
                    }
                }
            }
        },
        nuevoautor(){
            this.autor.accion = 'nuevo';
            this.autor.idautor = '';
            this.autor.codigo = '';
            this.autor.nombre = '';
            this.autor.pais = '';
            this.autor.telefono = '';
            this.autor.msg = '';
        }
    }, 
    created(){
        this.obtenerDatos();
    },
    template: `
        <div id='appautor'>
            <form @submit.prevent="guardarautor" @reset.prevent="nuevoautor" method="post" id="frmautor">
                <div class="card mb-3">
                    <div class="card-header text-white bg-dark">
                        Administracion de autors

                        <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#frmautor" aria-label="Close"></button>
                    </div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-1">Codigo</div>
                            <div class="col col-md-2">
                                <input v-model="autor.codigo" placeholder="codigo" pattern="[A-Z0-9]{3,10}" required title="Codigo de autor" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Nombre</div>
                            <div class="col col-md-2">
                                <input v-model="autor.nombre" placeholder="escribe tu nombre" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Nombre de autor" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Pais</div>
                            <div class="col col-md-2">
                                <input v-model="autor.pais" placeholder="De que pais eres" pattern="[A-Za-z0-9Ññáéíóú ]{3,100}" required title="Pais de autor" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Telefono</div>
                            <div class="col col-md-2">
                                <input v-model="autor.telefono" placeholder="tu tel" pattern="[0-9]{4}-[0-9]{4}" required title="Telefono de autor" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    {{ autor.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <button type="submit" class="btn btn-primary">Guardar</button>
                                <button type="reset" class="btn btn-warning">Nuevo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="card mb-3" id="cardBuscarautor">
                <div class="card-header text-white bg-dark">
                    Busqueda de autors

                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarautor" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td colspan="6">
                                    Buscar: <input title="Introduzca el texto a buscar" @keyup="buscarautor" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Pais</th>
                                <th>Telefono</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in autors" :key="item.idautor" @click="modificarautor(item)">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.pais}}</td>
                                <td>{{item.telefono}}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarautor(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});
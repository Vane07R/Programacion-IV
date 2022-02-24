Vue.component('libro', {
    data:()=>{
        return {
            Libros: [],
            buscar: '',
            libro: {
                accion: 'nuevo',
                msg : '',
                idLibro: '',
                codigo: '',
                titulo: '',
                editorial:'',
                edicion:''
            }
        }
    },
    methods: {
        buscarLibro(){
            this.obtenerDatos(this.buscar);
        },
        guardarLibro(){
            this.obtenerDatos();
            let Libros = this.Libros || [];
            if(this.libro.accion == 'nuevo'){
                this.libro.idLibro = idUnicoFecha();
                Libros.push(this.libro);
            }else if(this.libro.accion == 'modificar'){
                let index = Libros.findIndex(libro=>libro.idLibro==this.libro.idLibro);
                Libros[index] = this.libro;
            }else if(this.libro.accion == 'eliminar'){
                let index = Libros.findIndex(libro=>libro.idLibro==this.libro.idLibro);
                Libros.splice(index,1);
            }
            localStorage.setItem('Libros', JSON.stringify(this.libro));
            this.libro.msg = 'libro procesado con exito';
            this.nuevoLibro();
            this.obtenerDatos();
        },
        modificarLibro(data){
            this.libro = JSON.parse(JSON.stringify(data));
            this.libro.accion = 'modificar';
        },
        eliminarLibro(data){
            if( confirm(`¿Esta seguro de eliminar el libro ${data.nombre}?`) ){
                this.libro.idLibro = data.idLibro;
                this.libro.accion = 'eliminar';
                this.guardarLibro();
            }
        },
        obtenerDatos(busqueda=''){
            this.Libros = [];
            if( localStorage.getItem('Libros')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('Libros')).length; i++){
                    let data = JSON.parse(localStorage.getItem('Libros'))[i];
                    if( this.buscar.length>0 ){
                        if( data.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ){
                            this.Libros.push(data);
                        }
                    }else{
                        this.Libros.push(data);
                    }
                }
            }
        },
        nuevoLibro(){
            this.libro.accion = 'nuevo';
            this.libro.idLibro = '';
            this.libro.codigo = '';
            this.libro.titulo = '';
            this.libro.editorial = '';
            this.libro.edicion = '';
            this.libro.msg = '';
            console.log(this.libro);
        }
    }, 
    created(){
        this.obtenerDatos();
    },
    template: `
        <div id='appLibros'>
            <form @submit.prevent="guardarLibro" @reset.prevent="nuevoLibro" method="post" id="frmLibro">
                <div class="card mb-3">
                    <div class="card-header text-white bg-dark">
                        Administracion de Libros

                        <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#frmLibro" aria-label="Close"></button>
                    </div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-1">Codigo</div>
                            <div class="col col-md-2">
                                <input v-model="libro.codigo" placeholder="codigo" pattern="[A-Z0-9]{3,10}" required title="Codigo de libro" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Titulo</div>
                            <div class="col col-md-2">
                                <input v-model="libro.titulo" placeholder="escribe titulo del libro" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Titulo del libro" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Editorial</div>
                            <div class="col col-md-2">
                                <input v-model="libro.editorial" placeholder="editorial" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Nombre de la editorial" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">edicion</div>
                            <div class="col col-md-2">
                                <input v-model="libro.edicion" placeholder="edicion" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Nombre de la edicion" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    {{ libro.msg }}
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
            <div class="card mb-3" id="cardBuscarLibro">
                <div class="card-header text-white bg-dark">
                    Busqueda de Libros

                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarLibro" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td colspan="6">
                                    Buscar: <input title="Introduzca el libro a buscar" @keyup="buscarLibro" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr>
                                <th>Codigo</th>
                                <th>Titulo</th>
                                <th>Editorial</th>
                                <th>Edicion</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in Libros" :key="item.idLibro" @click="modificarLibro(item)">
                                <td>{{item.codigo}}</td>
                                <td>{{item.titulo}}</td>
                                <td>{{item.editorial}}</td>
                                <td>{{item.edicion}}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarLibro(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});

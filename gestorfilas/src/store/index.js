import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex,axios)

export default new Vuex.Store({
  state: {
    alerta: 0,
    admin:{},
    fila:{},
    nuevo_user: {
      rut: null,
      nombre: null,
      correo: null,
    },
    codigoFila: null, //por mientras
    user_fila:{
    user: null,
  }

  },
  mutations: {

      getFila:function(state)
      {
        axios.get("http://localhost:1818/admin/getbyrut/6666666666666").then((result) => {
          state.admin = result.data;
          //console.log(state.admin);
          state.codigoFila = state.admin.codigoFila;
          //console.log(this.codigoFila);
          axios.put("http://localhost:1818/filavirtual/editarestado/" + state.codigoFila)
        })
      },

      getTurnoActual(state)
      {
        //console.log(state.admin);
        console.log(state.codigoFila);
        axios.get("http://localhost:1818/filavirtual/getbycodigo/" + state.codigoFila).then((result) => {
          state.fila = result.data;
        })
      },

      createUser(state, nuevo_user){
        try{
          console.log(nuevo_user);
          axios.post('http://localhost:1818/user/create/', nuevo_user)
          .then(response =>{
            console.log(response);
          }
            )
          .catch(function(error){
            console.log(error);
          });
        } catch (err){
          console.log("Hubo un problema al crear el usuario." + err)
        }
      },

      getFilaYPausar(state){
          axios.get("http://localhost:1818/admin/getbyrut/12555555").then((result) => {
          state.admin = result.data;
          console.log(state.admin);
          state.fila = state.admin.fila;
          console.log(state.fila);
          axios.post("http://localhost:1818/filavirtual/editarpausada", state.fila)
        })
      },

      validarCodigo(state, pruebacodigo){
        axios.get("http://localhost:1818/filavirtual/getbycodigo/" + pruebacodigo).then((result) => {
        this.filaAsociada = result.data;
        if (this.filaAsociada == '') {
          console.log("sabe q es null");
          state.alerta = 1;
        }
        else{
        state.codigoFila = pruebacodigo;
        console.log(state.codigoFila);
          state.alerta = 2;
        }
      })
    },

    agregarUsuarioFila(state, user_fila){
      try{
        //state.user_fila = user_fila;
        //state.user_fila.user = user_fila.user;
        //state.user_fila.codigo = user_fila.codigo;
        console.log(user_fila);
        axios.post('http://localhost:1818/registrocliente/asignarturno', user_fila)
        .then(response =>{
          console.log(response);
        }
          )
        .catch(function(error){
          console.log(error);
        });
      } catch (err){
        console.log("Hubo un problema al agregar el usuario a la fila. " + err)
      }
    }
  },

  actions: {
  },
  modules: {
  },
})

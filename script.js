var alumnos = []
var nuevoAlumno
  

  
class Alumno{
    constructor(firstName, dni, lastName, email){
  
        this.firstName = firstName
        this.dni = dni
        this.lastName = lastName
        this.email = email
        
    }
   
     getFullName (){
           
            var element = document.createElement('li');
            var contenedor = document.getElementById("listaAlumnos")
            contenedor.appendChild(element);
            element.innerHTML = `<h1> ${this.firstName}</h1>
                                <h3>  ${this.dni}</h3>  `
      }
    
  }
   
  
  
  function insertar(){
        
    var insertarNombre = document.getElementById("nombreAlumno").value;
    var insertarDni =  document.getElementById("dniAlumno").value;
    
        nuevoAlumno = new Alumno(insertarNombre,insertarDni)
          
        if(esValido(insertarDni, insertarNombre)){      
            var filtro =  alumnos.filter(alumno => alumno.dni == insertarDni);
            if(filtro.length > 0 ){
                console.log("DNI REPETIDO");
            } else{
                alumnos.push(nuevoAlumno)           
                localStorage.setItem('Alumnos', JSON.stringify(alumnos))
                document.getElementById("formulario-alumnos").reset();
                document.getElementById("listaAlumnos").innerHTML= " ";                
                mostrarListaCompleta(alumnos);                
            }
        }else{
            alert("Falta ingresar datos");
        }
        
    }
 
    
    function esValido(insertarDni, insertarNombre){ 
        return (insertarDni > 0 && insertarNombre )
    }
    
    function getLocalList (key) {    
        var localList = JSON.parse(localStorage.getItem(key))
          if (!localList) {
              localStorage.setItem('Alumnos', JSON.stringify([]))
              return []
            } 
            return localList
      }  

      
    var alumnos = getLocalList('Alumnos')
      
    function mostrarListaCompleta(alumnos){  
            if(alumnos){  
                for(var i = 0; i < alumnos.length; i++){
                    var mostrarListaCompleta = new Alumno (alumnos[i].firstName, alumnos[i].dni, alumnos[i].lastName, alumnos[i].email);
                    mostrarListaCompleta.getFullName()                  
                }
            }else{
                console.log("No entra");
            }
            
    }

    mostrarListaCompleta(alumnos);



function buscarAlumno () {
    var buscarNombre = document.getElementById("buscarNombre").value.toUpperCase();
    var index = -1
    for (var i = 0; i < alumnos.length; i++) {
      var student = alumnos[i]
      if (student.firstName.toUpperCase() === buscarNombre) {
        index = i
        break
      }
    }
    if (index !== -1) {
        document.getElementById("buscarAlumno").innerText = student.firstName.toUpperCase() + " " + "DNI :" + student.dni ;
    } else {
        document.getElementById("buscarAlumno").innerText = 'No se pudo encontrar el estudiante'
        
    }
    return student

}
  

function eliminarAlumno(){
   var alumnoEncontrado = document.getElementById("inputDni").value;
   var preparoLista = JSON.parse(localStorage.getItem('Alumnos'));
   var auxLista =  preparoLista.filter(alumno => alumno.dni != alumnoEncontrado);
   localStorage.setItem('Alumnos', JSON.stringify(auxLista))
}

function isValidEmail(mail) { 
    return /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(mail); 
  }
  
  function validarEmail() {
    var email = document.getElementById("emailAlumno").value;
    if(isValidEmail(email)){ 
        document.getElementById("emailAlumno").style = "border:2px solid green;"
    } else {
        document.getElementById("emailAlumno").style = "border:2px solid red;"
    }
  }


  
  
export default function (
  cajasSinPallet: any,
  informacionSeleccion: string,
) {
  let [enf, index] = informacionSeleccion.split('/');


  cajasSinPallet[enf].splice(index, 1);
  return cajasSinPallet;
}


using System;
using System.Collections.Generic;

namespace AspiriaProject.Models
{
    public partial class Productos
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int? RestriccionEdad { get; set; }
        public string Compania { get; set; }
        public decimal Precio { get; set; }
    }
}

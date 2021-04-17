using AspiriaProject.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspiriaProject.Data.Interfaces
{
    public interface IProductosRepository
    {
        Task<List<Productos>> GetAllProducts();
        Task<Productos> CrearProducto(Productos productos);
        Task<Productos> EditarProducto(int id, Productos productos);
        Task<Productos> EliminarProducto(int id);

    }
}

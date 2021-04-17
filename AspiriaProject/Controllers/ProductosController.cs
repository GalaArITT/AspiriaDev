using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspiriaProject.Models;
using AspiriaProject.Data.Interfaces;

namespace AspiriaProject.ClientApp
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly AspiriaDatabaseContext _context;
        private readonly IProductosRepository _repository;

        public ProductosController(AspiriaDatabaseContext context, IProductosRepository repository)
        {
            _context = context;
            _repository = repository;
        }
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Productos>>> GetProductos()
        {
            return Ok(await _repository.GetAllProducts()); 
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> PutProductos(int id, Productos productos)
        {
            return Ok(await _repository.EditarProducto(id, productos));
        }
        [HttpPost("[action]")]
        public async Task<ActionResult<Productos>> PostProductos(Productos productos)
        {
            return Ok(await _repository.CrearProducto(productos));
        }

        [HttpDelete("[action]/{id}")]
        public async Task<ActionResult<Productos>> DeleteProductos(int id)
        {
            return Ok(await _repository.EliminarProducto(id));
        }

    }
}

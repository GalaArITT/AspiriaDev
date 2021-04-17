using AspiriaProject.Data.Interfaces;
using AspiriaProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspiriaProject.Data.Repositories
{
    public class ProductoRepository : IProductosRepository
    {
        private readonly AspiriaDatabaseContext _db;

        public ProductoRepository(AspiriaDatabaseContext db)
        {
            _db = db; 
        }
        public async Task<Productos> CrearProducto(Productos productos)
        {
            _db.Productos.Add(productos);
            await _db.SaveChangesAsync();
            return productos;
        }

        public async Task<Productos> EditarProducto(int id, Productos productos)
        {
            _db.Entry(productos).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw ex;
            }
            return productos; 
        }

        public async Task<Productos> EliminarProducto(int id)
        {
            var productos = await _db.Productos.FindAsync(id);
            _db.Productos.Remove(productos);
            await _db.SaveChangesAsync();

            return productos;
        }

        public async Task<List<Productos>> GetAllProducts()
        {
            return await _db.Productos.ToListAsync();
        }
    }
}

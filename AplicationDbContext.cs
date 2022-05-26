using BETarjetaCredito.Models;
using Microsoft.EntityFrameworkCore;

namespace BETarjetaCredito
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }
    }
}

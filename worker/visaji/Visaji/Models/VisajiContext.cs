using Microsoft.EntityFrameworkCore;

namespace Visaji.Models
{
    public class VisajiContext : DbContext
    {
        public VisajiContext(DbContextOptions<VisajiContext> options) : base(options)
        {
        }

        public DbSet<Credit> Credits { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Credit>().HasOne(c => c.Customer);
        }
    }
}

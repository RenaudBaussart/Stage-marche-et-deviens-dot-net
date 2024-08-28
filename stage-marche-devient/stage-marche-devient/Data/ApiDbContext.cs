using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Models;

namespace stage_marche_devient.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { }

        public DbSet<Session> Sessions { get; set; }

    }
}

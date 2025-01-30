using Microsoft.EntityFrameworkCore;
using SpaceInvadersGame.Models;

namespace SpaceInvadersGame.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Score> Scores { get; set; }
    }
}

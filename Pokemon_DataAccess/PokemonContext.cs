using Microsoft.EntityFrameworkCore;
using Pokemon_DataAccess.Entity;

namespace Pokemon_DataAccess
{
    public class PokemonContext:DbContext
    {
        public DbSet<Pokemon> Pokemon { get; set; }
        public DbSet<Ability> Abilities { get; set; }
        public DbSet<Type> Type { get; set; }

        public DbSet<PokemonType> PokemonTypes { get; set; }

        public PokemonContext(DbContextOptions options) : base(options)
        {

        }
    }

}

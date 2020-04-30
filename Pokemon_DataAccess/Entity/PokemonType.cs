using System.ComponentModel.DataAnnotations.Schema;

namespace Pokemon_DataAccess.Entity
{
    [Table("PokemonType")]
    public class PokemonType
    {
        public int PokemonTypeId { get; set; }
        public int PokemonId { get; set; }
        public int TypeId { get; set; }

        
        [ForeignKey("PokemonId")]
        public virtual Pokemon Pokemon { get; set; }

        [ForeignKey("TypeId")]
        public virtual Type Type { get; set; }
    }
}

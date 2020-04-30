using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pokemon_DataAccess;
using PokemonApplication.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using PokemonApplication.Services;

namespace PokemonApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonsController : ControllerBase
    {
        private readonly PokemonContext _context;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly HttpClient _httpClient;

        public PokemonsController(PokemonContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
            _httpClient = httpClientFactory.CreateClient();
        }

        //GET: api/Pokemons
       [HttpGet]
        public async Task<ActionResult<IEnumerable<PokemonBasicDTO>>> GetPokemon()
        {
            var pokemons = await _context.Pokemon
                .Include(p => p.Ability)
                .Include(p => p.PokemonTypes)
                .Select(p => new PokemonBasicDTO()
                {
                    PokemonId = p.PokemonId,
                    Name = p.Name,
                    Weight = p.Weight,
                    Height = p.Height,
                    ImageUrl = p.ImageUrl,
                    TypeDTOs = p.PokemonTypes.Select(pokemonType => new TypeDTO()
                    {
                        HexColor = pokemonType.Type.HexColor,
                        TypeName = pokemonType.Type.Name
                    }).ToList()
                })
                .ToListAsync();

            return pokemons;


        }

        // GET: api/Pokemons/5

        [HttpGet("{pokedexId}")]
        public async Task<ActionResult<IEnumerable<PokemonDetailedDTO>>> GetPokemonByPokedex(int pokedexId)
        {

            var pokemon = await _context.Pokemon
                .Where(p => p.PokedexId == pokedexId)
                .Include(p => p.Ability)
                .Include(p => p.PokemonTypes)
                .Select(p => new PokemonDetailedDTO()
                {
                    PokemonId = p.PokemonId,
                    PokedexId = p.PokedexId,
                    Name = p.Name,
                    HP = p.HP,
                    Speed = p.Speed,
                    Attack = p.Attack,
                    Defense = p.Defense,
                    SpecialAttack = p.SpecialAttack,
                    SpecialDefense = p.SpecialDefense,
                    Weight = p.Weight,
                    Height = p.Height,
                    ImageUrl = p.ImageUrl,
                    AbilityName = p.Ability.AbilityName,
                    Description = p.Ability.Description,
                    TypeDTOs = p.PokemonTypes.Select(pokemonType => new TypeDTO()
                    {
                        HexColor = pokemonType.Type.HexColor,
                        TypeName = pokemonType.Type.Name
                    }).ToList()
                })
                .ToListAsync();

            if (pokemon == null)
            {
                return NotFound();
            }

            return pokemon;
        }

        // GET: api/Pokemons/name/pokemonName
        [HttpGet("name/{pokemonName}")]
        public async Task<ActionResult<IEnumerable<PokemonDetailedDTO>>> GetPokemonByName(string pokemonName)
        {

            var pokemon = await _context.Pokemon
                .Where(p => p.Name == pokemonName)
                .Include(p => p.Ability)
                .Include(p => p.PokemonTypes)
                .Select(p => new PokemonDetailedDTO()
                {
                    PokemonId = p.PokemonId,
                    PokedexId = p.PokedexId,
                    Name = p.Name,
                    HP = p.HP,
                    Speed = p.Speed,
                    Attack = p.Attack,
                    Defense = p.Defense,
                    SpecialAttack = p.SpecialAttack,
                    SpecialDefense = p.SpecialDefense,
                    Weight = p.Weight,
                    Height = p.Height,
                    ImageUrl = p.ImageUrl,
                    AbilityName = p.Ability.AbilityName,
                    Description = p.Ability.Description,
                    TypeDTOs = p.PokemonTypes.Select(pokemonType => new TypeDTO()
                    {
                        HexColor = pokemonType.Type.HexColor,
                        TypeName = pokemonType.Type.Name
                    }).ToList()
                })
                .ToListAsync();

            if (pokemon == null)
            {
                return NotFound();
            }

            return pokemon;
        }

        // GET: api/Pokemons/name/pokemonName
        [HttpGet("getData/numOfPokemons")]
        public  ActionResult<string> GetPokemonFromAPI(int numOfPokemons)
        {
            ImportPokemonData importPokemonData = new ImportPokemonData(_context, _httpClientFactory);
            return importPokemonData.GetRecords(numOfPokemons);
        }
            //// PUT: api/Pokemons/5
            //// To protect from overposting attacks, please enable the specific properties you want to bind to, for
            //// more details see https://aka.ms/RazorPagesCRUD.
            //[HttpPut("{id}")]
            //public async Task<IActionResult> PutPokemon(int id, Pokemon pokemon)
            //{
            //    if (id != pokemon.PokemonId)
            //    {
            //        return BadRequest();
            //    }

            //    _context.Entry(pokemon).State = EntityState.Modified;

            //    try
            //    {
            //        await _context.SaveChangesAsync();
            //    }
            //    catch (DbUpdateConcurrencyException)
            //    {
            //        if (!PokemonExists(id))
            //        {
            //            return NotFound();
            //        }
            //        else
            //        {
            //            throw;
            //        }
            //    }

            //    return NoContent();
            //}

            //// POST: api/Pokemons
            //// To protect from overposting attacks, please enable the specific properties you want to bind to, for
            //// more details see https://aka.ms/RazorPagesCRUD.
            //[HttpPost]
            //public async Task<ActionResult<Pokemon>> PostPokemon(Pokemon pokemon)
            //{
            //    _context.Pokemon.Add(pokemon);
            //    await _context.SaveChangesAsync();

            //    return CreatedAtAction("GetPokemon", new { id = pokemon.PokemonId }, pokemon);
            //}

            //// DELETE: api/Pokemons/5
            //[HttpDelete("{id}")]
            //public async Task<ActionResult<Pokemon>> DeletePokemon(int id)
            //{
            //    var pokemon = await _context.Pokemon.FindAsync(id);
            //    if (pokemon == null)
            //    {
            //        return NotFound();
            //    }

            //    _context.Pokemon.Remove(pokemon);
            //    await _context.SaveChangesAsync();

            //    return pokemon;
            //}

            private bool PokemonExists(int id)
        {
            return _context.Pokemon.Any(e => e.PokemonId == id);
        }
    }
}

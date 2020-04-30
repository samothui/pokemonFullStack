using Pokemon_DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace PokemonApplication.Services
{
    public class ImportPokemonData
    {
        private readonly PokemonContext _context;

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly HttpClient _httpClient;

        public ImportPokemonData(PokemonContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
            _httpClient = httpClientFactory.CreateClient();
        }

        public string GetRecords (int numOfPokemons)
        {
            var response =  _httpClient.GetAsync("https://pokeapi.co/api/v2/pokemon/ditto").ToString();
            return response;
        }
    }
}

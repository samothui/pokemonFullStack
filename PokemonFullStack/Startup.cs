using Pokemon_DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using PokemonApplication.Services;

namespace PokemonFullStack
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "ClientApp/dist";
            //});

            services.AddScoped<ImportPokemonData>();

            services.AddControllers()
                    .AddJsonOptions(jsonOptions =>
                    {
                        jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null;
                    });

            string sqlConnectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<PokemonContext>(options =>
            {
                options.UseSqlServer(sqlConnectionString);
            });

            services.AddHttpClient();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("*")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.UseStaticFiles();
            //app.UseSpaStaticFiles();
            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "ClientApp";
            //    if (env.IsDevelopment())
            //    {
            //        spa.UseAngularCliServer(npmScript: "start");
            //        //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
            //    }
            //});
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //}

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

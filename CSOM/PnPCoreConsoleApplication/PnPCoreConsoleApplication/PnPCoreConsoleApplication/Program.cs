using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PnP.Core.QueryModel;
using PnP.Core.Services;
using PnP.Core.Services.Builder.Configuration;
using PnP.Core.Auth.Services.Builder.Configuration;
using System.Linq;

namespace PnPCoreConsoleApplication
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var host = Host.CreateDefaultBuilder()
            // Configure logging
            .ConfigureLogging((hostingContext, logging) =>
            {
                logging.AddEventSourceLogger();
                logging.AddConsole();
            })
            // Configure services
            .ConfigureServices((hostingContext, services) =>
            {
                // Add the PnP Core SDK library services
                services.AddPnPCore();
                // Add the PnP Core SDK library services configuration from the appsettings.json file
                services.Configure<PnPCoreOptions>(hostingContext.Configuration.GetSection("PnPCore"));
                // Add the PnP Core SDK Authentication Providers
                services.AddPnPCoreAuthentication();
                // Add the PnP Core SDK Authentication Providers configuration from the appsettings.json file
                services.Configure<PnPCoreAuthenticationOptions>(hostingContext.Configuration.GetSection("PnPCore"));
            })
            // Let the builder know we're running in a console
            .UseConsoleLifetime()
            // Add services to the container
            .Build();

            await host.StartAsync();

            using (var scope = host.Services.CreateScope())
            {
                var pnpContextFactory = scope.ServiceProvider.GetRequiredService<IPnPContextFactory>();

                using (var context = await pnpContextFactory.CreateAsync("DevSite"))
                {
                    var web = await context.Web.GetAsync(p => p.Title, p => p.Lists, p => p.MasterUrl);

                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine("===Web (REST)===");
                    Console.WriteLine($"Title: {web.Title}");
                    Console.WriteLine($"# Lists: {web.Lists.Length}");
                    Console.WriteLine($"Master page url: {web.MasterUrl}");
                    Console.ResetColor();

                    // We can retrieve the whole list of lists 
                    // and their items in the context web
                    var listsQuery = (from l in context.Web.Lists.QueryProperties(l => l.Id, l => l.Title, l => l.Description)
                                      orderby l.Title descending
                                      select l);

                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine("===LINQ: Retrieve list and list items===");
                    foreach (var list in listsQuery.ToList())
                    {
                        Console.WriteLine($"{list.Id} - {list.Title} - Items count: {list.Items.Length}");
                    }
                    Console.ResetColor();
                }
            }

            host.Dispose();
        }
    }
}

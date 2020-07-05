using System;
using System.Security;
using System.Threading.Tasks;
using CSOMDemo;
using Microsoft.SharePoint.Client;

namespace exampleConsoleApplication
{
    class Program
    {
        private const string _siteUrl = "[SiteUrl]";
        private const string _userLogin = "[UserLogin]";
        private const string _listName = "[ListName]";

        public static async Task Main(string[] args)
        {
            Uri site = new Uri(_siteUrl);
            SecureString password = GetSecureString($"Password for {_userLogin}");

            using (var authenticationManager = new AuthenticationManager())
            using (var context = authenticationManager.GetContext(site, _userLogin, password))
            {
                context.Load(context.Web, p => p.Title);
                await context.ExecuteQueryAsync();
                Console.WriteLine($"Title: {context.Web.Title}");

                var web = context.Web;
                var list = web.Lists.GetByTitle(_listName);
                context.Load(list, includes => includes.Title);
                await context.ExecuteQueryAsync();
                Console.WriteLine($"List Title: {list.Title}");

                ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                ListItem item = list.AddItem(itemCreateInfo);
                item["Title"] = "New Item Added Via CSOM";
                item.Update();
                await context.ExecuteQueryAsync();
            }
        }

        public static SecureString GetSecureString(string message)
        {
            SecureString securePwd = new SecureString();
           
            Console.WriteLine(message);
            var password = Console.ReadLine();

            foreach(var ch in password)
            {
                securePwd.AppendChar(ch);
            }

            return securePwd;
        }
    }
}


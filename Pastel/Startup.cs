using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Pastel.Startup))]
namespace Pastel
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

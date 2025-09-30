using AT.Data;
using AT.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

new MulticastLogger("log.txt").Log("MulticastLogger utilizado. Olá AT!");

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<AtContext>(options =>
  options.UseSqlite(
    builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
  app.UseExceptionHandler("/Home/Error");
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    "default",
    "{controller=Home}/{action=Index}/{id?}")
  .WithStaticAssets();


app.Run();

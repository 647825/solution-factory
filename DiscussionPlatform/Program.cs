using DiscussionPlatform.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
      options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext with SQLite
builder.Services.AddDbContext<DiscussionContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS
builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(builder =>
  {
    builder.WithOrigins("http://localhost:4200")
           .AllowAnyHeader()
           .AllowAnyMethod();
  });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}
//using (var scope = app.Services.CreateScope())
//{
//  var context = scope.ServiceProvider.GetRequiredService<DiscussionContext>();
//  context.Database.ExecuteSqlRaw("DELETE FROM Comments");
//  context.Database.ExecuteSqlRaw("DELETE FROM Posts");
//}

app.UseHttpsRedirection();

app.UseCors(); // Gebruik CORS

app.UseAuthorization();
app.MapControllers();

app.Run();

public partial class Program { }

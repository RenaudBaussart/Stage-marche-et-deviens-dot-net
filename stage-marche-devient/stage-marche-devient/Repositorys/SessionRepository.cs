using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Models;
using stage_marche_devient.Data;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Repositorys
{
    public class SessionRepository : ISessionRepository
    {
        private readonly ApiDbContext _context;
        public SessionRepository(ApiDbContext context)
            => _context = context;

        public async IAsyncEnumerable<Session> GetAllAsync()
        {
            await foreach (var session in _context.Sessions)
            {
                yield return session;
            }
        }

        public async Task<Session?> GetByIdAsync(int id)
            => await _context.Sessions.FindAsync(id);

        public async Task CreateAsync(Session session)
        {
            if (!await _context.Randonnees.AnyAsync(r => r.Id == session.RandonneeId) && !await _context.Themes.AnyAsync(t => t.Id == session.ThemeId))
            {
                throw new InvalidOperationException("La randonnée ou le thème spécifié n'existe pas.");
            }
            await _context.Sessions.AddAsync(session);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Session session)
        {
            _context.Update(session);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var session = await _context.Sessions.FindAsync(id);
            if (session != null)
            {
                _context.Sessions.Remove(session);
                await _context.SaveChangesAsync();
            }
        }
    }
}

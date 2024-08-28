using stage_marche_devient.Models;

namespace stage_marche_devient.Repositories
{
    public interface ISessionRepository
    {
        IAsyncEnumerable<Session> GetAllAsync();
        Task<Session?> GetByIdAsync(Guid id);
        Task CreateAsync(Session session);
        Task UpdateAsync(Session session);
        Task DeleteAsync(Guid id);
    }
}
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.Models
{
    public class Session
    {
        #region Propriétés d'identification
        [Column("id_session"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        #endregion

        #region Informations sur la session
        [Column("lieu_depart"), MaxLength(40)]
        public string Lieu { get; set; }

        [Column("date_debut_session")]
        public string Date_debut { get; set; }

        [Column("date_fin_session")]
        public string Date_fin { get; set; }

        [Column("randonnee_id"), ForeignKey(nameof(Randonnee))]
        public int RandonneeId { get; set; }

        [Column("theme_id"), ForeignKey(nameof(Theme))]
        public int ThemeId { get; set; }
        #endregion

        #region Propriétés de navigation
        /// <summary>
        /// Randonnée associée à la session.
        /// </summary>
        public virtual Randonnee Randonnee { get; set; }

        /// <summary>
        /// Thème associé à la session.
        /// </summary>
        public virtual Theme Theme { get; set; }
        #endregion
    }
}

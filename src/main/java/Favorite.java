
import java.net.URISyntaxException;
import java.util.List;
import org.sql2o.Connection;

/**
 * POJO auxiliar para Sql2o da tabela favorites
 * @author Felipe.S
 */
public class Favorite {
    private long userId;
    private long mediaId;
    private String title;
    private String comment;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getMediaId() {
        return mediaId;
    }

    public void setMediaId(long mediaId) {
        this.mediaId = mediaId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public static List<Favorite> getAllByUser(long userId) throws URISyntaxException {
        String sql = "SELECT * FROM favorites WHERE userId=:userId";
        try (Connection con = DB.getInstance().getSql2o().open()) {
            List<Favorite> results = con.createQuery(sql)
                    .addParameter("userId", userId)
                    .executeAndFetch(Favorite.class);       
            return results;
        }
    }
}

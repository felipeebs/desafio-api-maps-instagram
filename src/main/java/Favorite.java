import java.net.URISyntaxException;
import org.sql2o.Connection;

/**
 * POJO auxiliar para Sql2o da tabela favorites
 * @author Felipe.S
 */
public class Favorite {
    private long userId;
    private String mediaId;
    private String title;
    private String comment;
    private String thumbUrl;
    private String standardUrl;
    private String uploader;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getMediaId() {
        return mediaId;
    }

    public void setMediaId(String mediaId) {
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

    public String getThumbUrl() {
        return thumbUrl;
    }

    public void setThumbUrl(String thumbUrl) {
        this.thumbUrl = thumbUrl;
    }

    public String getStandardUrl() {
        return standardUrl;
    }

    public void setStandardUrl(String standardUrl) {
        this.standardUrl = standardUrl;
    }

    public String getUploader() {
        return uploader;
    }

    public void setUploader(String uploader) {
        this.uploader = uploader;
    }

    public Favorite (long userId, String mediaId, String title, String comment, String thumbUrl, String standardUrl, String uploader) {
        this.userId = userId;
        this.mediaId = mediaId;
        this.title = title;
        this.comment = comment;
        this.thumbUrl = thumbUrl;
        this.standardUrl = standardUrl;
        this.uploader = uploader;
    }

    public static Favorite get(long userId, String mediaId) throws URISyntaxException {
        String sql = "SELECT * FROM favorites WHERE userId=:userId AND mediaId=:mediaId";
        try (Connection con = DB.getInstance().getSql2o().open()) {
            Favorite result = con.createQuery(sql)
                    .addParameter("userId", userId)
                    .addParameter("mediaId", mediaId)
                    .executeAndFetchFirst(Favorite.class);
            return result;
        }
    }

    public static boolean save(Favorite favorite) throws URISyntaxException {
        String sql = "INSERT INTO favorites values (:userId, :mediaId, :title, :comment, :thumbUrl, :standardUrl, :uploader)";
        try (Connection con = DB.getInstance().getSql2o().open()) {
            con.createQuery(sql)
                    .bind(favorite)
                    .executeUpdate();
            con.close();
            return con.getResult() == 1;
        }
    }

    public static boolean update(Favorite favorite) throws URISyntaxException {
        String sql = "UPDATE favorites"
                +"SET title=:title comment=:comment"
                +"WHERE userId=:userId, mediaId=:mediaId";
        try (Connection con = DB.getInstance().getSql2o().open()) {
            con.createQuery(sql)
                    .bind(favorite)
                    .executeUpdate();
            con.close();
            return con.getResult() == 1;
        }
    }

    public static boolean delete(long userId, String mediaId) throws URISyntaxException {
        String sql = "DELETE FROM favorites WHERE userId=:uerId AND mediaId=:mediaId";
        try (Connection con = DB.getInstance().getSql2o().open()) {
            con.createQuery(sql)
                    .addParameter("uerId", userId)
                    .addParameter("mediaId", mediaId)
                    .executeUpdate();
            return con.getResult() == 1;
        }
    }
}

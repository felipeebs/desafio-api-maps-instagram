
import java.net.URISyntaxException;
import java.util.List;
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

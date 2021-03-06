import java.net.URISyntaxException;
import java.util.List;
import org.sql2o.Connection;

/**
 * POJO auxiliar para Sql2o da tabela users
 * @author Felipe.S
 */
public class User {
    private Long id;
    private String login;
    private String password;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public static User auth(String login, String password) throws URISyntaxException {
        String sql = "SELECT id,user FROM users WHERE login=:login AND password=:password";
        try (Connection con = DB.getInstance().getSql2o().open()) {
            User result = con.createQuery(sql)
                    .addParameter("login", login)
                    .addParameter("password", password)
                    .executeAndFetchFirst(User.class);
            return result;
        }
    }

    public static List<Favorite> getFavorites(long userId) throws URISyntaxException {
        String sql = "SELECT * FROM favorites WHERE userId=:userId";
        try (Connection con = DB.getInstance().getSql2o().open()) {
            List<Favorite> results = con.createQuery(sql)
                    .addParameter("userId", userId)
                    .executeAndFetch(Favorite.class);
            return results;
        }
    }
}

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
            List<User> results = con.createQuery(sql)
                    .addParameter("login", login)
                    .addParameter("password", password)
                    .executeAndFetch(User.class);
            return results.size() > 0 ? results.get(0) : null;
        }
    }
}

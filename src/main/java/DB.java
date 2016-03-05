import com.heroku.sdk.jdbc.DatabaseUrl;
import java.net.URISyntaxException;
import org.sql2o.Sql2o;

/**
 * Singleton para acesso ao banco de dados via Sql2o
 * @author Felipe.S
 */
public final class DB {
    private static DB instance;
    private static Sql2o sql2o;
    
    public static DB getInstance() throws URISyntaxException {
        if (instance == null) {
            instance = new DB();
            String dbUrl = DatabaseUrl.extract().jdbcUrl();
            String dbUser = DatabaseUrl.extract().username();
            String dbPass = DatabaseUrl.extract().password();
            sql2o = new Sql2o(dbUrl, dbUser, dbPass);
        }
        return instance;
    }
    
    public Sql2o getSql2o() {
        return sql2o;
    }
}

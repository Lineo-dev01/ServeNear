import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/ui/Card";
import { getUsers } from "../../utils/authStorage";

export default function AdminUsers() {
  const users = getUsers();

  return (
    <AppLayout userType="admin">
      <section className="page-header">
        <p className="eyebrow">Admin Users</p>
        <h1>Registered users</h1>
        <p>View demo users created during MVP testing.</p>
      </section>

      {users.length === 0 ? (
        <div className="empty-state">
          <h2>No users yet</h2>
          <p>Registered demo users will appear here.</p>
        </div>
      ) : (
        <section className="admin-table-list">
          {users.map((user) => (
            <Card key={user.id} className="admin-user-card">
              <div>
                <p className="provider-category">{user.role}</p>
                <h2>{user.fullName}</h2>
                <p>{user.email}</p>
              </div>

              <span className={`role-badge role-${user.role}`}>
                {user.role}
              </span>
            </Card>
          ))}
        </section>
      )}
    </AppLayout>
  );
}
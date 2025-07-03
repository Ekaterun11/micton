const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      user: null,
      showRegister: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        phone: '',
        passNumber: '',
        password: ''
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passNumber: ''
      },
      currentPage: 'dashboard',
      menuItems: [],
      batchFilter: { id: '', status: '' },
      equipmentFilter: { name: '', status: '' },
      planFilter: { date: '', type: '' },
      reportFilter: { type: '', date: '' },
      showAddBatchModal: false,
      showAddEquipmentModal: false,
      showAddUserModal: false,
      showBatchDetails: false,
      showEquipmentDetails: false,
      showReportDetails: false,
      showConfirmModal: false,
      confirmDeleteType: '',
      confirmDeleteId: null,
      selectedBatch: null,
      selectedEquipment: null,
      selectedReport: null,
      newBatch: { id: '', status: 'In Progress', lastOperation: '' },
      newEquipment: { id: '', name: '', status: 'Online', nextService: '' },
      newUser: { username: '', group: 'Operator' },
      batches: [
        { id: 'B001', status: 'In Progress', lastOperation: '2025-06-01 Etching' },
        { id: 'B002', status: 'Completed', lastOperation: '2025-06-02 Testing' },
        { id: 'B003', status: 'In Progress', lastOperation: '2025-06-03 Deposition' },
        { id: 'B004', status: 'Failed', lastOperation: '2025-06-04 Inspection' },
        { id: 'B005', status: 'In Progress', lastOperation: '2025-06-05 Etching' },
        { id: 'B006', status: 'Completed', lastOperation: '2025-06-06 Testing' },
        { id: 'B007', status: 'In Progress', lastOperation: '2025-06-07 Deposition' },
        { id: 'B008', status: 'Failed', lastOperation: '2025-06-08 Inspection' },
        { id: 'B009', status: 'In Progress', lastOperation: '2025-06-09 Etching' },
        { id: 'B010', status: 'Completed', lastOperation: '2025-06-10 Testing' },
        { id: 'B011', status: 'In Progress', lastOperation: '2025-06-11 Deposition' },
        { id: 'B012', status: 'Failed', lastOperation: '2025-06-12 Inspection' },
        { id: 'B013', status: 'In Progress', lastOperation: '2025-06-13 Etching' },
        { id: 'B014', status: 'Completed', lastOperation: '2025-06-14 Testing' },
        { id: 'B015', status: 'In Progress', lastOperation: '2025-06-15 Deposition' }
      ],
      equipment: [
        { id: 'E001', name: 'Etcher 1', status: 'Online', nextService: '2025-07-10' },
        { id: 'E002', name: 'Tester 2', status: 'Offline', nextService: '2025-07-05' },
        { id: 'E003', name: 'Deposition Unit 1', status: 'Online', nextService: '2025-07-15' },
        { id: 'E004', name: 'Inspector 1', status: 'Online', nextService: '2025-07-20' },
        { id: 'E005', name: 'Etcher 2', status: 'Offline', nextService: '2025-07-25' },
        { id: 'E006', name: 'Tester 3', status: 'Online', nextService: '2025-07-30' },
        { id: 'E007', name: 'Deposition Unit 2', status: 'Online', nextService: '2025-08-01' },
        { id: 'E008', name: 'Inspector 2', status: 'Offline', nextService: '2025-08-05' },
        { id: 'E009', name: 'Etcher 3', status: 'Online', nextService: '2025-08-10' },
        { id: 'E010', name: 'Tester 4', status: 'Online', nextService: '2025-08-15' },
        { id: 'E011', name: 'Deposition Unit 3', status: 'Offline', nextService: '2025-08-20' },
        { id: 'E012', name: 'Inspector 3', status: 'Online', nextService: '2025-08-25' },
        { id: 'E013', name: 'Etcher 4', status: 'Online', nextService: '2025-08-30' },
        { id: 'E014', name: 'Tester 5', status: 'Offline', nextService: '2025-09-01' },
        { id: 'E015', name: 'Deposition Unit 4', status: 'Online', nextService: '2025-09-05' }
      ],
      plans: [
        { id: 'P001', type: 'Short-term', date: '2025-06-17', description: 'Etching Batch B001' },
        { id: 'P002', type: 'Long-term', date: '2025-07-01', description: 'Annual Maintenance' },
        { id: 'P003', type: 'Short-term', date: '2025-06-17', description: 'Testing Batch B002' },
        { id: 'P004', type: 'Short-term', date: '2025-06-18', description: 'Deposition Batch B003' }
      ],
      reports: [
        { id: 'R001', type: 'Batch Report', date: '2025-06-10' },
        { id: 'R002', type: 'Equipment Report', date: '2025-06-12' }
      ],
      users: [
        { id: 1, username: 'operator1', group: 'Operator' },
        { id: 2, username: 'admin1', group: 'Admin' }
      ],
      dbConnection: null,
      batchChart: null,
      equipmentChart: null,
      planChart: null
    };
  },
  computed: {
    filteredBatches() {
      return this.batches.filter(batch => 
        batch.id.toLowerCase().includes(this.batchFilter.id.toLowerCase()) &&
        (this.batchFilter.status === '' || batch.status === this.batchFilter.status)
      );
    },
    filteredEquipment() {
      return this.equipment.filter(item => 
        item.name.toLowerCase().includes(this.equipmentFilter.name.toLowerCase()) &&
        (this.equipmentFilter.status === '' || item.status === this.equipmentFilter.status)
      );
    },
    filteredPlans() {
      return this.plans.filter(plan => 
        plan.date.includes(this.planFilter.date) &&
        (this.planFilter.type === '' || plan.type === this.planFilter.type)
      );
    },
    filteredReports() {
      return this.reports.filter(report => 
        (this.reportFilter.type === '' || report.type === this.reportFilter.type) &&
        report.date.includes(this.reportFilter.date)
      );
    },
    dashboard() {
      return {
        activeBatches: this.batches.filter(b => b.status === 'In Progress').length,
        equipmentOnline: this.equipment.filter(e => e.status === 'Online').length,
        tasksToday: this.plans.filter(p => p.date === '2025-06-17').length
      };
    },
    batchChartData() {
      const statuses = ['In Progress', 'Completed', 'Failed'];
      const counts = statuses.map(status => 
        this.batches.filter(b => b.status === status).length
      );
      return {
        labels: statuses,
        datasets: [{
          label: 'Статусы партий',
          data: counts,
          backgroundColor: ['#3b82f6', '#10b981', '#ef4444'], 
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      };
    },
    equipmentChartData() {
      const statuses = ['Online', 'Offline'];
      const counts = statuses.map(status => 
        this.equipment.filter(e => e.status === status).length
      );
      return {
        labels: statuses,
        datasets: [{
          label: 'Статусы оборудования',
          data: counts,
          backgroundColor: ['#10b981', '#ef4444'], 
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      };
    },
    planChartData() {
      const dates = [...new Set(this.plans.map(p => p.date))].sort();
      const counts = dates.map(date => 
        this.plans.filter(p => p.date === date).length
      );
      return {
        labels: dates,
        datasets: [{
          label: 'Задачи по датам',
          data: counts,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)', 
          fill: true,
          tension: 0.4
        }]
      };
    }
  },
  methods: {
    async connectToDatabase() {
      try {
        const { Pool } = require('pg');
        this.dbConnection = new Pool({
          user: 'your_username',
          host: 'localhost',
          database: 'micron2',
          password: 'your_password',
          port: 5432,
        });
        await this.dbConnection.connect();
        console.log('Connected to PostgreSQL');
      } catch (error) {
        console.error('Failed to connect to PostgreSQL:', error);
      }
    },
    validateRegisterForm() {
      this.errors = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passNumber: ''
      };
      let isValid = true;

      const nameRegex = /^[А-Яа-я]+$/;
      if (!nameRegex.test(this.registerForm.firstName)) {
        this.errors.firstName = 'Имя должно содержать только русские буквы';
        isValid = false;
      }
      if (!nameRegex.test(this.registerForm.lastName)) {
        this.errors.lastName = 'Фамилия должна содержать только русские буквы';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.registerForm.email)) {
        this.errors.email = 'Введите корректный email';
        isValid = false;
      }

      const phoneRegex = /^\d{11}$/;
      if (!phoneRegex.test(this.registerForm.phone)) {
        this.errors.phone = 'Номер телефона должен состоять из 11 цифр';
        isValid = false;
      }

      const passNumberRegex = /^\d{6}$/;
      if (!passNumberRegex.test(this.registerForm.passNumber)) {
        this.errors.passNumber = 'Номер пропуска должен состоять из 6 цифр';
        isValid = false;
      }

      return isValid;
    },
    async register() {
      if (!this.validateRegisterForm()) return;

      const newUser = {
        id: this.users.length + 1,
        username: this.registerForm.email,
        group: 'Operator',
        firstName: this.registerForm.firstName,
        lastName: this.registerForm.lastName, 
        patronymic: this.registerForm.patronymic,
        phone: this.registerForm.phone,
        passNumber: this.registerForm.passNumber
      };

      if (this.dbConnection) {
        try {
          await this.dbConnection.query(
            'INSERT INTO users (id, username, group, first_name, last_name, patronymic, phone, pass_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [newUser.id, newUser.username, newUser.group, newUser.firstName, newUser.lastName, newUser.patronymic, newUser.phone, newUser.passNumber]
          );
        } catch (error) {
          console.error('Failed to save user to database:', error);
        }
      }

      this.users.push(newUser);
      this.user = {
        username: newUser.username,
        role: newUser.group.toLowerCase()
      };
      this.updateMenu();
      this.showRegister = false;
      this.registerForm = { firstName: '', lastName: '', patronymic: '', email: '', phone: '', passNumber: '', password: '' };
      this.currentPage = 'dashboard';
      this.$nextTick(() => this.initCharts()); 
    },
    login() {
      if (this.loginForm.username && this.loginForm.password) {
        this.user = {
          username: this.loginForm.username,
          role: this.loginForm.username.includes('admin') ? 'admin' : 'operator'
        };
        this.updateMenu();
        this.currentPage = 'dashboard';
        this.$nextTick(() => this.initCharts());
      }
    },
    logout() {
      this.user = null;
      this.currentPage = '';
      this.menuItems = [];
      if (this.dbConnection) {
        this.dbConnection.end();
      }
      if (this.batchChart) {
        this.batchChart.destroy();
        this.batchChart = null;
      }
      if (this.equipmentChart) {
        this.equipmentChart.destroy();
        this.equipmentChart = null;
      }
      if (this.planChart) {
        this.planChart.destroy();
        this.planChart = null;
      }
    },
    updateMenu() {
      this.menuItems = [
        { name: 'Дашборд', page: 'dashboard' },
        { name: 'Прослеживание партий', page: 'tracking' },
        { name: 'Мониторинг оборудования', page: 'equipment' },
        { name: 'Планирование производства', page: 'planning' },
        { name: 'Генерация отчетов', page: 'reports' }
      ];
      if (this.user && this.user.role === 'admin') {
        this.menuItems.push({ name: 'Управление пользователями', page: 'users' });
      }
    },
    viewBatch(batch) {
      this.selectedBatch = batch;
      this.showBatchDetails = true;
    },
    viewEquipment(equipment) {
      this.selectedEquipment = equipment;
      this.showEquipmentDetails = true;
    },
    viewReport(report) {
      this.selectedReport = report;
      this.showReportDetails = true;
    },
    showConfirmDelete(type, id) {
      this.confirmDeleteType = type;
      this.confirmDeleteId = id;
      this.showConfirmModal = true;
    },
    cancelDelete() {
      this.showConfirmModal = false;
      this.confirmDeleteType = '';
      this.confirmDeleteId = null;
    },
    confirmDelete() {
      if (this.confirmDeleteType === 'batch') {
        this.deleteBatch(this.confirmDeleteId);
      } else if (this.confirmDeleteType === 'equipment') {
        this.deleteEquipment(this.confirmDeleteId);
      } else if (this.confirmDeleteType === 'plan') {
        this.deletePlan(this.confirmDeleteId);
      } else if (this.confirmDeleteType === 'report') {
        this.deleteReport(this.confirmDeleteId);
      } else if (this.confirmDeleteType === 'user') {
        this.deleteUser(this.confirmDeleteId);
      }
      this.cancelDelete();
    },
    deleteBatch(id) {
      this.batches = this.batches.filter(b => b.id !== id);
      if (this.dbConnection) {
        this.dbConnection.query('DELETE FROM batches WHERE id = $1', [id])
          .catch(error => console.error('Failed to delete batch from database:', error));
      }
      this.updateCharts();
    },
    deleteEquipment(id) {
      this.equipment = this.equipment.filter(e => e.id !== id);
      if (this.dbConnection) {
        this.dbConnection.query('DELETE FROM equipment WHERE id = $1', [id])
          .catch(error => console.error('Failed to delete equipment from database:', error));
      }
      this.updateCharts();
    },
    deletePlan(id) {
      this.plans = this.plans.filter(p => p.id !== id);
      if (this.dbConnection) {
        this.dbConnection.query('DELETE FROM plans WHERE id = $1', [id])
          .catch(error => console.error('Failed to delete plan from database:', error));
      }
      this.updateCharts();
    },
    deleteReport(id) {
      this.reports = this.reports.filter(r => r.id !== id);
      if (this.dbConnection) {
        this.dbConnection.query('DELETE FROM reports WHERE id = $1', [id])
          .catch(error => console.error('Failed to delete report from database:', error));
      }
    },
    clearBatchFilter() {
      this.batchFilter = { id: '', status: '' };
    },
    clearEquipmentFilter() {
      this.equipmentFilter = { name: '', status: '' };
    },
    clearPlanFilter() {
      this.planFilter = { date: '', type: '' };
    },
    clearReportFilter() {
      this.reportFilter = { type: '', date: '' };
    },
    addBatch() {
      if (this.newBatch.id && this.newBatch.lastOperation) {
        this.batches.push({ ...this.newBatch });
        if (this.dbConnection) {
          this.dbConnection.query(
            'INSERT INTO batches (id, status, last_operation) VALUES ($1, $2, $3)',
            [this.newBatch.id, this.newBatch.status, this.newBatch.lastOperation]
          ).catch(error => console.error('Failed to save batch to database:', error));
        }
        this.showAddBatchModal = false;
        this.newBatch = { id: '', status: 'In Progress', lastOperation: '' };
        this.updateCharts();
      }
    },
    addEquipment() {
      if (this.newEquipment.id && this.newEquipment.name && this.newEquipment.nextService) {
        this.equipment.push({ ...this.newEquipment });
        if (this.dbConnection) {
          this.dbConnection.query(
            'INSERT INTO equipment (id, name, status, next_service) VALUES ($1, $2, $3, $4)',
            [this.newEquipment.id, this.newEquipment.name, this.newEquipment.status, this.newEquipment.nextService]
          ).catch(error => console.error('Failed to save equipment to database:', error));
        }
        this.showAddEquipmentModal = false;
        this.newEquipment = { id: '', name: '', status: 'Online', nextService: '' };
        this.updateCharts();
      }
    },
    addUser() {
      if (this.newUser.username) {
        const newUser = {
          id: this.users.length + 1,
          username: this.newUser.username,
          group: this.newUser.group
        };
        this.users.push(newUser);
        if (this.dbConnection) {
          this.dbConnection.query(
            'INSERT INTO users (id, username, group) VALUES ($1, $2, $3)',
            [newUser.id, newUser.username, newUser.group]
          ).catch(error => console.error('Failed to save user to database:', error));
        }
        this.showAddUserModal = false;
        this.newUser = { username: '', group: 'Operator' };
      }
    },
    editUser(user) {
      alert(`Редактирование пользователя ${user.username}`);
    },
    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id);
      if (this.dbConnection) {
        this.dbConnection.query('DELETE FROM users WHERE id = $1', [id])
          .catch(error => console.error('Failed to delete user from database:', error));
      }
    },
    generateReport() {
      const newReport = {
        id: `R${String(this.reports.length + 1).padStart(3, '0')}`,
        type: this.reportFilter.type || 'Batch Report',
        date: this.reportFilter.date || '2025-06-17'
      };
      this.reports.push(newReport);
      if (this.dbConnection) {
        this.dbConnection.query(
          'INSERT INTO reports (id, type, date) VALUES ($1, $2, $3)',
          [newReport.id, newReport.type, newReport.date]
        ).catch(error => console.error('Failed to save report to database:', error));
      }
    },
    initCharts() {
      if (this.currentPage !== 'dashboard' || this.batchChart || this.equipmentChart || this.planChart) return;

      const batchCtx = document.getElementById('batchChart')?.getContext('2d');
      if (batchCtx) {
        this.batchChart = new Chart(batchCtx, {
          type: 'pie',
          data: this.batchChartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        });
      }

      const equipmentCtx = document.getElementById('equipmentChart')?.getContext('2d');
      if (equipmentCtx) {
        this.equipmentChart = new Chart(equipmentCtx, {
          type: 'bar',
          data: this.equipmentChartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true }
            },
            plugins: {
              legend: { display: false }
            }
          }
        });
      }

      const planCtx = document.getElementById('planChart')?.getContext('2d');
      if (planCtx) {
        this.planChart = new Chart(planCtx, {
          type: 'line',
          data: this.planChartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true }
            },
            plugins: {
              legend: { display: false }
            }
          }
        });
      }
    },
    updateCharts() {
      if (this.batchChart) {
        this.batchChart.data = this.batchChartData;
        this.batchChart.update();
      }
      if (this.equipmentChart) {
        this.equipmentChart.data = this.equipmentChartData;
        this.equipmentChart.update();
      }
      if (this.planChart) {
        this.planChart.data = this.planChartData;
        this.planChart.update();
      }
    }
  },
  watch: {
    currentPage(newPage) {
      if (newPage === 'dashboard') {
        this.$nextTick(() => this.initCharts());
      } else if (this.batchChart || this.equipmentChart || this.planChart) {
        if (this.batchChart) {
          this.batchChart.destroy();
          this.batchChart = null;
        }
        if (this.equipmentChart) {
          this.equipmentChart.destroy();
          this.equipmentChart = null;
        }
        if (this.planChart) {
          this.planChart.destroy();
          this.planChart = null;
        }
      }
    }
  },
  mounted() {
    this.connectToDatabase();
    this.$nextTick(() => this.initCharts());
  }
});

app.mount('#app');

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Редагування користувача
    </h1>
    <ol class="breadcrumb">
        <li><a href="<?=ADMIN;?>"><i class="fa fa-dashboard"></i> Головна</a></li>
        <li><a href="<?=ADMIN;?>/user"> Список користувачів</a></li>
        <li class="active">Редагування користувача</li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="box">
                <form action="<?=ADMIN;?>/user/edit" method="post" data-toggle="validator">
                    <div class="box-body">
                        <div class="form-group has-feedback">
                            <label for="login">Логін</label>
                            <input type="text" class="form-control" name="login" id="login" value="<?=h($user->login);?>" required>
                            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                        </div>
                        <div class="form-group">
                            <label for="password">Пароль</label>
                            <input type="password" class="form-control" name="password" id="password" placeholder="Введіть пароль, якщо хочете його змінити">
                        </div>
                        <div class="form-group has-feedback">
                            <label for="name">Прізвище та ім'я</label>
                            <input type="text" class="form-control" name="name" id="name" value="<?=h($user->name);?>" required>
                            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" name="email" id="email" value="<?=h($user->email);?>" required>
                            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <label for="address">Адреса</label>
                            <input type="text" class="form-control" name="address" id="address" value="<?=h($user->address);?>" required>
                            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                        </div>
                        <div class="form-group">
                            <label>Роль</label>
                            <select name="role" id="role" class="form-control">
                                <option value="user"<?php if($user->role == 'user') echo ' selected'; ?>>Користувач</option>
                                <option value="admin"<?php if($user->role == 'admin') echo ' selected'; ?>>Адміністратор</option>
                            </select>
                        </div>
                    </div>
                    <div class="box-footer">
                        <input type="hidden" name="id" value="<?=$user->id;?>">
                        <button type="submit" class="btn btn-primary">Зберегти</button>
                    </div>
                </form>
            </div>

            <h3>Замовлення користувача</h3>
            <div class="box">
                <div class="box-body">
                    <?php if($orders): ?>
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Статус</th>
                                    <th>Сума</th>
                                    <th>Дата створення</th>
                                    <th>Дата зміни</th>
                                    <th>Дії</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php foreach($orders as $order): ?>
                                    <?php $class = $order['status'] ? 'success' : ''; ?>
                                    <tr class="<?=$class;?>">
                                        <td><?=$order['id'];?></td>
                                        <td><?=$order['status'] ? 'Завершене' : 'Нове';?></td>
                                        <td><?=$order['sum'];?> <?=$order['currency'];?></td>
                                        <td><?=$order['date'];?></td>
                                        <td><?=$order['update_at'];?></td>
                                        <td><a href="<?=ADMIN;?>/order/view?id=<?=$order['id'];?>"><i class="fa fa-fw fa-eye"></i></a></td>
                                    </tr>
                                <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php else: ?>
                        <p class="text-danger">Користувач поки нічого не замовляв...</p>
                    <?php endif; ?>
        </div>
    </div>

</section>
<!-- /.content -->

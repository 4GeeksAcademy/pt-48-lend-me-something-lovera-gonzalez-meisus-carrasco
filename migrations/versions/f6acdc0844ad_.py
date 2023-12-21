"""empty message

Revision ID: f6acdc0844ad
Revises: 85e10e430d31
Create Date: 2023-12-21 10:28:56.358908

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f6acdc0844ad'
down_revision = '85e10e430d31'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('markets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('region', sa.String(length=50), nullable=False),
    sa.Column('headquarters', sa.String(length=50), nullable=False),
    sa.Column('currency', sa.String(length=50), nullable=False),
    sa.Column('opentime', sa.String(length=50), nullable=False),
    sa.Column('closetime', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('markets')
    # ### end Alembic commands ###
